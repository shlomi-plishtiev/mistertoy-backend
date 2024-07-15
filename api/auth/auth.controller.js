import { authService } from './auth.service.js'
import { logger } from '../../services/logger.service.js'
import { log } from '../../middlewares/logger.middleware.js'

export async function login(req, res) {
    const { username, password } = req.body
    try {
        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)

        logger.info('User login successful: ', user)
        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        logger.error('Failed to login: ', err)
        res.status(401).send({ err: 'Invalid username or password' })
    }
}

export async function signup(req, res) {
    // console.log('account');

    const { username, password, fullname } = req.body
    try {
        if (!username || !password || !fullname) {
            logger.error('Missing signup details')
            return res.status(400).send({ err: 'Missing required fields' })
        }

        const account = await authService.signup(username, password, fullname)
        logger.debug(`New account created: ` + JSON.stringify(account))
        
        console.log(account);

        const user = await authService.login(username, password)
        const loginToken = authService.getLoginToken(user)

        res.cookie('loginToken', loginToken)
        res.json(user)
    } catch (err) {
        logger.error('Failed to signup: ', err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

export async function logout(req, res) {
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        logger.error('Failed to logout: ', err)
        res.status(500).send({ err: 'Failed to logout' })
    }
}
