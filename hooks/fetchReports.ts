import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

interface CommentReport{
    id: string;
    title: string;
    description: string;
}

interface ReportsType {
    id: string;
    title: string;
    comments: CommentReport[] | any;
  }
  
  interface FetchReportReturnType {
    loading: boolean;
    error: string | null;
    reports: ReportsType[] | any;
    setReports: React.Dispatch<React.SetStateAction<ReportsType[] | any>>;
  }
  
  export default function useFetchReports(): FetchReportReturnType {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [reports, setReports] = useState<ReportsType[] | null>(null);
  
    const { currentUser } = useAuth();

    useEffect(() => {
        async function fetchData() {
          try {
            if (currentUser) {
              const docRef = doc(db, "users", currentUser.uid);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                setReports(docSnap.data().reports);
              } else {
                setReports([]);
              }
            }
          } catch (err) {
            setError("Failed to load reports");
            console.log(err);
          } finally {
            setLoading(false);
          }
        }
        fetchData();
      }, [currentUser]);
    
      return { loading, error, reports, setReports };
}
