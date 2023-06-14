import './style.css';
import WhatsApp from '../../img/whatsapp.jpg';

export const ChatIntro = () => {
    
    return (
        <div className='chatIntro'>
            <img src={WhatsApp} alt=""/>
            <h1>Mantenha seu celular conectado</h1>
            <h2>O WhatsApp conecta ao seu telefone para sincronizar
                suas mensagens. <br/> Para reduzir o uso dos dados, conecte seu telefone
                a uma rede Wi-Fi.
            </h2>
        </div>    
    );
}