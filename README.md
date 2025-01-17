# match-service
IMT A1 - Micro services architecture

# Domaine Combat
## Service Match
### Ressources gérées :
- Informations sur les matchs (état, participants, dates, scores, vainqueur)
- Invitations et participation aux matchs
### Technologies :
- Java avec Spring Boot
- Stockage : PostgreSQL
- Envoie des statistiques via un bus de messages RabbitMQ
### Principales fonctionnalités :

- GET /match : Récupere tout les matchs (ouvert ou par invitation).
- POST /match : Créer un nouveau match (ouvert ou par invitation).
- GET /match/{matchId} : Consulter les détails d’un match.
- PUT /match/{matchId} : Mettre à jour l’état d’un match (début, finalisation, etc.).
- GET /match?userId={userId} : Lister les matchs d’un utilisateur tout en vérifiant la limite de 3 matchs simultanés.
- DELETE /match/{matchId} : Supprimer un match.
- POST /match/{matchId}/invite :  Permet à l’organisateur d’un match d’inviter un ou plusieurs utilisateurs à rejoindre un match.
- POST /match/{matchId}/accept :  Permet à un utilisateur invité d’accepter une invitation et de rejoindre le match.
- POST /match/{matchId}/decline :  Permet à un utilisateur invité de refuser une invitation.
- POST /match/{matchId}/join :  Permet à un utilisateur de rejoindre un match public (sans invitation, si les conditions le permettent).
