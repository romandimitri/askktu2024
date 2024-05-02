// import { useEffect, useState } from 'react';
// import { toast } from 'react-hot-toast';
// import { getEmbeddings } from './embeddings';

// function YourComponent() {
//  const [embeddings, setEmbeddings] = useState(null);

//  useEffect(() => {
//     const fetchEmbeddings = async () => {
//       const text = "Your sample text here";
//       const response = await getEmbeddings(text);

//       if (response.error) {
//         // Handle the error on the client side
//         toast.error(response.error);
//       } else {
//         setEmbeddings(response);
//       }
//     };

//     fetchEmbeddings();
//  }, []);

//  return (
//     <div>
//       {/* Render your component based on the embeddings state */}
//     </div>
//  );
// }

// export default YourComponent;