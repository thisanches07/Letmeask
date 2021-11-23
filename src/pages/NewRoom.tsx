 import { FormEvent, useState} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss';
import { Button } from '../components/Button';
import { database } from '../services/firebase'
 import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'


export function NewRoom(){
const {user} = useAuth()
const navigate = useNavigate()
const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent){
    event.preventDefault();{/*funcao que previne o recarregamento da pagina(evita fazer com que a pagina pisque) */}

    if(newRoom.trim() === '')
    {
      return;
    }

    const roomRef = database.ref('rooms')//cria a sessao rooms dentro do banco de dados

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id, 
    });//joga a informacao para dentro de rooms

    navigate(`/rooms/${firebaseRoom.key}`)//envia para a sala correta com a chave da slaa no firebase

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivio</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img id="logo" src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
            <form onSubmit={handleCreateRoom}>{/*essa funcao fica no form, porque se o usuario apertar ENTER, o formulario tambem é enviado */}
              <input
                type="text"
                placeholder="Nome da sala"
                onChange={event => setNewRoom(event.target.value)}//sempre que o usuario digitar algo no imput, atualiza o valor do estado
                value={newRoom}
              />
              <Button id="sala-button" type="submit">
                Criar sala
              </Button>
            </form>
            <p id="entrar-na-sala">
               Quer entrar em uma sala existente? <Link to="/">clique aqui</Link> {/*link para voltar para /  */}
            </p>
        </div>
      </main>
    </div>
  )
}