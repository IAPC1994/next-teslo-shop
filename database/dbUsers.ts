import bcrypt from 'bcryptjs';
import { User } from "@/models";
import { db } from ".";


export const checkUserEmailPassword = async( email:string, password:string ) => {
    await db.connect();
    const user = await User.findOne({ email });
    await db.disconnect();

    if( !user ) return null;
    if( !bcrypt.compareSync( password, user.password! ) ) return null;

    const { role, name, _id } = user;
    return{
        _id,
        email: email.toLowerCase(),
        role,
        name
    }
}

export const oAuthToDbUser = async ( oAuthEmail:string, oAuthName: string ) => {
    await db.connect();
    const user = await User.findOne({ email: oAuthEmail });
    if( user ){
        await db.disconnect();
        const { _id, name, email, role, lastName } = user;
        return { _id, name, email, role, lastName };
    }
    
    const newUser = new User({ email: oAuthEmail, name: oAuthName.split(' ')[0], lastName: oAuthName.split(' ')[1], password: '@', role: 'client' });
    await newUser.save();
    await db.disconnect();

    const { _id, name, email, role, lastName } = newUser;
    return { _id, name, email, role, lastName };
}