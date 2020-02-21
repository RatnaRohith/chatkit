const util = require('util');
const prompt = require('prompt');

const main = async()=>{
    prompt.start()

    const usernamSchema = [{
        description: 'Enter your username',
        name:'username',
        required:true
    }]
    const { username } = await getComputedStyle(usernameSchema)
    console.log(username);
}
main()