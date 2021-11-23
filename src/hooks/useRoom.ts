import { useState, useEffect } from "react";
import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record<string,{
    author:{
        name:string;
        avatar: string;
    }
    content:string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<string, {
        authorId:string;
    }>
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
    likeCount: number;
    likeId: string | undefined;
}

export function useRoom(roomId: string | undefined){
    const {user} = useAuth();
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
                    likeCount: Object.values(value.likes ?? {}).length,
                    likeId: Object.entries(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],//verifica se o find retornou algo, se sim, retorna a posicao 0
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions)
        })

        return ()=>{
            roomRef.off('value');
        }
    },[roomId, user?.id]);//toda vez que o id da sala mudar, executar o codigo de useEffect novamente, para atualizar os dados da sala se ele navegar de uma sala para outra

    return {questions, title}
}