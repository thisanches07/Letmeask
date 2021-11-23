import { useState, useEffect } from "react";
import { database } from "../services/firebase";

type FirebaseQuestions = Record<string,{
    author:{
        name:string;
        avatar: string;
    }
    content:string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>
type QuestionType = {
    id:string;
    author:{
        name:string;
        avatar: string;
    }
    content:string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

export function useRoom(roomId: string | undefined){
    const [questions,setQuestions]= useState<QuestionType[]>([]);
    const [title, setTitle] = useState('');

    useEffect(()=>{//um hook que dispara um evento sempre que alguma informacao mudar, se passar como vazio, ela executa uma unica vez quando o componente for exibito em tela
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value',room =>{
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};//informa que o databaseRoom.questions é do tipo FirebaseQuestions
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {//destructuring
                return{
                    id:key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions)
        })
    },[roomId]);//toda vez que o id da sala mudar, executar o codigo de useEffect novamente, para atualizar os dados da sala se ele navegar de uma sala para outra

    return {questions, title}
}