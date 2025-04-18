import { v4 as uuidv4 } from 'uuid';
import { UserType } from '@/types/user.type';


export const user: UserType = {
    id: uuidv4(),
    pwd: '123',
    username: 'dio'
}