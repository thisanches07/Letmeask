import {useNavigate} from 'react-router-dom'


import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth'


export function Home(){
  const navigate = useNavigate();//isso é um Hook e todo Hook deve estar dentro do componente
  const {user, signInWithGoogle} = useAuth();
   async function handleCreateRoom(){//redireciona para o /rooms/new
    if(!user){
      await signInWithGoogle();
    }
    navigate('/rooms/new');
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
          <button onClick={handleCreateRoom} className="create-room">
            <img id="google-logo" src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
            </button>

            <div className="separator" >ou entre em uma sala</div>
            <form action="">
              <input
                type="text"
                placeholder="Digite o código da sala"
              />
              <Button id="sala-button" type="submit">
                Entrar na sala
              </Button>
            </form>
        </div>
      </main>
    </div>
  )
}