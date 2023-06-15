import { useState, useEffect } from 'react';
import './style.css';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { getContactList, addNewChat as addNewChatApi} from '../../Api'

export const NewChat = ({user, chatlist, show, setShow, setActiveChat}) => {

    const [list, setList] = useState([]);

    useEffect(() => {
        const getList = async () => {
            if (user !== null){
                let results = await getContactList(user.id);
                setList(results);
            }
        }
        getList();

    }, [user]);

    const handleClose = () => {
        setShow(false);    
    }

    const addNewChat = async (user2) => {

        //verifica se a pessoa já não está no chat
        for (let i in chatlist){
            if (chatlist[i].with === user2.id) {
                //já está falando com essa pessoa
                setActiveChat(chatlist[i]);
                handleClose();
                return;
            }
        }

        await addNewChatApi(user, user2);

        handleClose();
    }

    return (
        <div className='newChat' style={{left: show ? 0 : -415}}>
            <div className='newChat--head'>
                <div onClick={handleClose} className='newChat--backbutton'>
                    <ArrowBackIcon style={{ color: '#FFF' }} />
                </div>
                <div className='newChat--headtitle'>Nova Conversa</div>
            </div>
            <div className='newChat--list'>
                {list.map((item, key) =>(
                    <div onClick={()=>addNewChat(item)} className='newChat--item' key={key}> 
                        <img className='newChat--itemavatar' src={item.avatar} alt=''/>
                        <div className='newChat--Itemname'>{item.name}</div>

                    </div>
                ))}
            </div>
        </div>
    )
}