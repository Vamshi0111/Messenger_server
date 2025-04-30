import Notification from "./model/chat_notification";
import users from "./model/users";
import Meme from "./model/meme";
import feedback from "./model/feedback";
import Session from "./model/session";
import { RoomsScreen } from "./model/RoomsScreen";
import status_update from "./model/status_update";
import VipMembership from "./model/vip_membership";
import SwitchAccounts from "./model/switchaccount";
import People from "./model/people";
import { Conversation } from "./model/Conversations";
import chat from "./model/chat";
import Comments from "./model/comments";
import FriendRequest from "./model/friendRequest";

import RecoveryModel from "./model/emailrecovery";

async function init(){
  
    const isDev = false;
    await users.sync({alter:isDev})
    await Notification.sync({alter:isDev}) 
    await Meme.sync({alter:isDev})
    await Session.sync({alter:isDev})
    await Conversation.sync({alter:isDev})
    await People.sync({alter:isDev})
    await feedback.sync({alter:isDev})
    await RoomsScreen.sync({alter:isDev})
    await status_update.sync({alter:isDev})
    await VipMembership.sync({alter:isDev})
    await SwitchAccounts.sync({alter:isDev})
    await People.sync({alter:isDev})
    await chat.sync({alter:isDev})
    await Comments.sync({alter:isDev})
    await FriendRequest.sync({alter:isDev})
    await RecoveryModel.sync({alter:isDev})
}
const dbInit = () =>{
    init();
}

export default init;