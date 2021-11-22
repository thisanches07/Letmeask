// import { useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss';
import { Button } from '../components/Button';
// import { useAuth } from '../hooks/useAuth'


export function NewRoom(){
  //  const {user} = useAuth()

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
            <form action="">
              <input
                type="text"
                placeholder="Nome da sala"
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