import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Socket } from 'socket.io';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';


interface ConnectedClients {
    [id: string]: {
        socket: Socket,
        user: User,
    }
}

@Injectable()
export class MessagesWsService {

    private connectClients: ConnectedClients = {}

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async registerClient( client: Socket, userId: string ) {
        
        const user = await this.userRepository.findOneBy({ id: userId });
        if ( !user ) throw new Error('User not found');
        if ( !user.isActive ) throw new Error('User not active');

        this.checkUserConnection( user );

        this.connectClients[client.id] = {
            socket: client,
            user: user,
        };

    }

    removeClient( clientId: string ) {
        delete this.connectClients[clientId];
    }


    getConnectedClients(): string[] {
        
        return Object.keys( this.connectClients );
    }

    getUserfullName(sockedId: string ) {
        return this.connectClients[sockedId].user.fullName;
    }

    private checkUserConnection( user: User ) {
        for (const clientId of Object.keys( this.connectClients ) ) {
            
            const connectedClient = this.connectClients[clientId];

            if ( connectedClient.user.id === user.id ){
                connectedClient.socket.disconnect();
                break;
            }
        }
    }
}
