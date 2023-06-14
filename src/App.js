import React, { useState, useEffect } from 'react';
import './App.css';

import { ChatListItem } from './components/ChatListItem';
import { ChatIntro } from './components/ChatIntro';
import { ChatWindow } from './components/ChatWindow';
import { NewChat } from './components/NewChat';
import { Login } from './components/Login'
import { addUser } from './Api';

import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import { onChatList } from './Api';

const App = () => {

    const [chatlist, setChatList] = useState([]);
    const [activeChat, setActiveChat] = useState({});
    
    // const [user, setUser] = useState({
    //     id: '2SDNPOWOtaM0A3OYZ8jvO13xza53',
    //     name: 'Jonathan Damásio Medeiros',
    //     avatar: 'https://firebasestorage.googleapis.com/v0/b/whatsappclone-fe560.appspot.com/o/2SDNPOWOtaM0A3OYZ8jvO13xza53?alt=media&token=11e38086-129c-48e1-a530-ff3f33791236'
    // });

    const [user, setUser] = useState(null);
    const [showNewChat, setShowNewChat] = useState(false);

    useEffect(() => {
        if (user !== null){
            let unsub = onChatList(user.id, setChatList);
            return unsub;
        }
    }, [user]);


    const handleNewChat = () => {
        setShowNewChat(true);
    }

    const handleLoginData = async (u, profilePicture) => {
        let newUser = {
            id: u.user.uid,
            name: u.user.displayName,
            avatar: profilePicture
        };
        setUser(newUser);
        await addUser(newUser);
    }
    

    if (user === null){
        return (<Login onReceive={handleLoginData} />)
    }

    return (
        <div className='app-window'>
            <div className='sidebar'>
                <NewChat 
                    chatlist={chatlist}
                    user={user}
                    show={showNewChat}
                    setShow={setShowNewChat}
                />
                <header>
                    <img className='header--avatar' src={URL.createObjectURL(user.avatar)} alt='' />
                    <div className='header--buttons'>
                        <div className='header--btn'>
                            <DonutLargeIcon style={{ color: '#919191' }} />
                        </div>
                        <div onClick={handleNewChat} className='header--btn'>
                            <ChatIcon style={{ color: '#919191' }} />
                        </div>
                        <div className='header--btn'>
                            <MoreVertIcon style={{ color: '#919191' }} />
                        </div>
                    </div>
                </header>

                <div className='search'>
                    <div className='search--input'>
                        <SearchIcon fontSize='small' style={{ color: '#919191' }} />
                        <input type='search' placeholder='Procurar ou começar uma nova conversa' />
                    </div>
                </div>

                <div className='chatlist'>
                    {chatlist.map((item, key) => (
                        <ChatListItem
                            key={key}
                            data={item}
                            active={activeChat.chatId === item.chatId}
                            onClick={()=>setActiveChat(item)}
                        >
                        </ChatListItem>
                    ))}
                </div>

            </div>

            <div className='contentarea'>
                {activeChat.chatId !== undefined &&
                    <ChatWindow 
                        user={user}
                        data={activeChat}
                    />
                }

                {activeChat.chatId === undefined &&
                    <ChatIntro />
                }

            </div>

        </div>
    );
}

export default App;