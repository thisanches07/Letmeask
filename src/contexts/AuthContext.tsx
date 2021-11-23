import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string;
    avatar: string;
  }
  type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
  }
  type AuthContextProviderProps = {
    children: ReactNode; 
  }

export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider(props:AuthContextProviderProps){
  const [user, setUser] = useState<User>();
  
  useEffect(() => {//hook do react, todo hook comeca com hook, esse hook fica observando se houve alteracao no estado de autenticacao, para casos de atualizacao de tela

    const unsubscribe = auth.onAuthStateChanged(user => {//verifica se existia um login pre feito pelo usuario
      if(user){
        const {displayName, photoURL, uid} = user//pega informacoes do user

        if(!displayName || !photoURL)
        {
          throw new Error('Missing information from Google Account.')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })
    return ()=>{
      unsubscribe();
    }
  }, []) //segundo parametro sempre vai ser um array

  //autenticação
  async function signInWithGoogle(){
    const provider = new firebase.auth.GoogleAuthProvider();{/*mostra a forma de login*/ }

    const result = await auth.signInWithPopup(provider)

    {/*abre  um popup na tela para entrar com Google*/}
      if(result.user){
        const {displayName, photoURL, uid} = result.user//pega informacoes do user

        if(!displayName || !photoURL)
        {
          throw new Error('Missing information from Google Account.')
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
  }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
           {props.children}
            </AuthContext.Provider>
    );
}