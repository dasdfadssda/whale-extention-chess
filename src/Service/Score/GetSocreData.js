import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { dbService } from "../../fbase"; 

// {difficulty}Score 컬렉션의 모든 문서를 시간에 대해 정렬하여 가져오는 함수
const fetchScoreData = async (difficulty) => {
  try {
    const scoreCollectionRef = collection(dbService, `${difficulty}Score`);
    const q = query(scoreCollectionRef, orderBy("time", "asc"));
    const querySnapshot = await getDocs(q);

    const scoreData = [];
    querySnapshot.forEach((doc) => {
      scoreData.push({ id: doc.id, ...doc.data() });
    });

    return scoreData;
  } catch (error) {
    console.error("Error fetching score data:", error);
    throw error;
  }
};

export default fetchScoreData;
