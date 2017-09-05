const WRITE_MESSAGE = 'WRITE_MESSAGE';

export function writeMessage (content) {
    const action = { type: WRITE_MESSAGE, content };
    return action;
  }

  export default function newMessageReducer(state = '', action) {    
        switch (action.type) {
            case WRITE_MESSAGE:
                return action.content
            default:
                return state;
        } 
    }