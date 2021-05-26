import {useDispatch} from 'react-redux'
import {useRouter} from 'next/router'
import { signInAction } from '../../src/user/actions';

const Index = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const getUser = async () => {
        //TODO:非同期処理はHooksで実装
        const url = "https://api.github.com/users/maniizu3110";
            const response = await fetch(url).then(res => res.json())
            const name = response.login
            const id = response.id
            dispatch(signInAction({name:name,id:`${id}`}))
            router.push('/show-redux-state')
        
    }
    return(
        <div>
            <button onClick={()=>getUser()}>ログイン</button>
        </div>
        )
};

export default Index;
