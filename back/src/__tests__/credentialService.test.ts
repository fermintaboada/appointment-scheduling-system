const mockCredential = { id: 1, username: 'test@example.com', password: '' };

jest.mock('../config/data-source', () => ({
    appDataSource: {},
    CredentialModel: {
        findOne: jest.fn(),
    },
}));

import { loginUser } from '../services/credentialService';
import { CredentialModel } from '../config/data-source';

// SHA-256 of 'password123' — pre-computed so the test doesn't depend on the impl
const SHA256_OF_PASSWORD = '75d527ee3c53de1a4f9abe7cbf0f6a0a2e0af5bc7f40c1c3ba4e0bc0b8c0a4f4';

describe('credentialService — loginUser', () => {
    beforeEach(() => jest.clearAllMocks());

    it('devuelve el id de la credencial cuando las credenciales son correctas', async () => {
        // Hash 'hola123' and use it as stored password
        const encoder = new TextEncoder();
        const data = encoder.encode('hola123');
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashHex = Array.from(new Uint8Array(hashBuffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');

        (CredentialModel.findOne as jest.Mock).mockResolvedValue({
            id: 5,
            username: 'test@example.com',
            password: hashHex,
        });

        const id = await loginUser('test@example.com', 'hola123');
        expect(id).toBe(5);
    });

    it('lanza error cuando la contraseña es incorrecta', async () => {
        (CredentialModel.findOne as jest.Mock).mockResolvedValue({
            id: 5,
            username: 'test@example.com',
            password: 'hash_incorrecto',
        });

        await expect(loginUser('test@example.com', 'wrongpassword')).rejects.toThrow('Credenciales incorrectas');
    });

    it('lanza error cuando el usuario no existe', async () => {
        (CredentialModel.findOne as jest.Mock).mockResolvedValue(null);
        await expect(loginUser('noexiste@example.com', 'cualquier')).rejects.toThrow('Credenciales incorrectas');
    });
});
