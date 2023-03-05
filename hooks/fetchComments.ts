/* import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

interface CommentType {
  id: string;
  title: string;
  description: string;
}

interface FetchCommentReturnType {
  loading: boolean;
  error: string | null;
  comments: CommentType[] | any;
  setComments: React.Dispatch<React.SetStateAction<CommentType[] | any>>;
}

export default function useFetchComments(): FetchCommentReturnType {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<CommentType[] | null>(null);

  const { currentUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        if (currentUser) {
          const docRef = doc(db, "users", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setComments(docSnap.data().comments);
          } else {
            setComments([]);
          }
        }
      } catch (err) {
        setError("Failed to load comments");
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [currentUser]);

  return { loading, error, comments, setComments };
}
 */