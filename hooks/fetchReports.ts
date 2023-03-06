import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";

export interface CommentType {
  id: number;
  title: string;
  description: string;
}

interface ReportType {
  title: string;
  docUrl: string;
  comments: CommentType[];
}

interface FetchReportReturnType {
  loading: boolean;
  error: string | null;
  reports: ReportType[] | any;
  setReports: React.Dispatch<React.SetStateAction<ReportType[] | any>>;
}

export default function useFetchReports(): FetchReportReturnType {
  const [reports, setReports] = useState<ReportType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
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
