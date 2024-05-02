import { Pinecone, PineconeRecord, PineconeConfiguration } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import md5 from "md5";
import {
 Document,
 RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";
import { convertToAscii } from "./utils";

export const getPineconeClient = () => {
 // Simplified configuration with only the apiKey
 const config = {
     apiKey: process.env.PINECONE_API_KEY!,
 };
 
 return new Pinecone();
};

type PDFPage = {
 pageContent: string;
 metadata: {
    loc: { pageNumber: number };
 };
};

export async function loadS3IntoPinecone(fileKey: string) {
 console.log("downloading s3 into file system");
 const file_name = await downloadFromS3(fileKey);
 if (!file_name) {
    throw new Error("could not download from s3");
 }
 console.log("loading pdf into memory" + file_name);
 const loader = new PDFLoader(file_name);
 const pages = (await loader.load()) as PDFPage[];

 const documents = await Promise.all(pages.map(prepareDocument));
 const vectors = await Promise.all(documents.flat().map(embedDocument));

 const client = await getPineconeClient();
 const pineconeIndex = await client.index("askktu");
 // Use a single namespace for all documents
 const namespace = pineconeIndex.namespace("global");

 console.log("inserting vectors into pinecone");
 await namespace.upsert(vectors);

 return documents[0];
}

async function embedDocument(doc: Document) {
 try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
 } catch (error) {
    console.log("error embedding document", error);
    throw error;
 }
}

export const truncateStringByBytes = (str: string, bytes: number) => {
 const enc = new TextEncoder();
 return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
 let { pageContent, metadata } = page;
 pageContent = pageContent.replace(/\n/g, "");
 const splitter = new RecursiveCharacterTextSplitter();
 const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 360000),
      },
    }),
 ]);
 return docs;
}