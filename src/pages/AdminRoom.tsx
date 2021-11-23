import { useParams } from 'react-router-dom'
import { useState } from 'react'

import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import '../styles/room.scss'

import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'

export function AdminRoom() {
    // const { user } = useAuth();
    const params = useParams();
    const [newQuestion, setNewQuestion] = useState('');
    const roomId = params.id

    const {title,questions} = useRoom(roomId);

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="" />
                    <div>
                    <RoomCode code={roomId!} />
                    <Button isOutlined>Encerrar sala</Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                    
                </div>
                <div className="question-list">
                {questions.map(question =>{
                    return(
                        <Question
                            key={question.id}//algoritmo de reconciliação
                            content={question.content}
                            author={question.author}
                        />
                    )
                })}
                </div>
            </main>
        </div>
    )
}