import { useEffect, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import React from 'react';

type GraphQLResponse = {events:{id: string, title: string, description: string, date:Date, startHour:number, endHour:number }[]};

const Events=() =>{

    const query= gql`
     query Query {
        events {
            id
            title
            description
            date
            startHour
            endHour
        }
    }

    `;

    const createEvent= gql`
        mutation Mutation($title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!) {
         createEvent(title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
            id
            title
            description
            date
            startHour
            endHour
        }
    }

    `;

    const deleteEvent=gql`
        mutation Mutation($deleteEventId: string!) {
        deleteEvent(id: $deleteEventId) {
            id
            title
            description
            date
            startHour
            endHour
        }
    }

    `;

    const updateEvent=gql`
        mutation Mutation($updateEventId: string!, $title: String!, $description: String!, $date: Date!, $startHour: Int!, $endHour: Int!) {
        updateEvent(id: $updateEventId, title: $title, description: $description, date: $date, startHour: $startHour, endHour: $endHour) {
            id
            title
            description
            date
            startHour
            endHour
        }
    }

    `;

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [startHour, setStartHour] = useState<number>(0);
    const [endHour, setEndHour] = useState<number>(0);
    const [Id, setId]=useState<string>("");
   

    const [createEventMutation] = useMutation(createEvent);
    const [deleteEventMutation] = useMutation(deleteEvent);
    const [updateEventMutation] = useMutation(updateEvent);

    const {  error, data, refetch} = useQuery<GraphQLResponse|undefined>(query, {
        variables: {
          id: Id||"",
          title: title||"",
          description: description||"",
          date: date,
          startHour: startHour||0,
          endHour: endHour||0,
        },
        fetchPolicy: "network-only"
    });

  
    if (error) return <div>Error: {error.message}</div>;
    const { events } = data || { events: [] };

   

    return (
        <>
      
        <Links href="/"> Volver</Links>
        <FLEX>
            <Title> Eventos</Title>
            
            
            <Caja>
            <Subtitle> Agregar Evento</Subtitle>

         

            <Cajas>

            <TEXTO>Title:</TEXTO>
            <Input placeholder="titulo" type="string" value={title} onChange={(e: { target: { value: string; }; }) => setTitle((e.target.value))} />
            </Cajas>
            
               
            
            <Cajas>
            <TEXTO>Description:</TEXTO>
            <Input placeholder="descripcion" type="string" value={description} onChange={(e: { target: { value: string; }; }) => setDescription((e.target.value))} />
            </Cajas>

            <Cajas>
            <TEXTO>Date:</TEXTO>
            <Input placeholder="00" type="date" value={date} onChange={(e: { target: { value: string; }; }) => setDate((e.target.value))} />
            </Cajas>
             
           
            <Cajas>
            <TEXTO>Hora empieza:</TEXTO>
            <Input placeholder="00" type="number" value={startHour} onChange={(e: { target: { value: string; }; }) => setStartHour(parseInt(e.target.value))} />
            </Cajas>

            

            <Cajas>
            <TEXTO>Hora acaba:</TEXTO>
            <Input placeholder="00" type="number" value={endHour} onChange={(e: { target: { value: string; }; }) => setEndHour(parseInt(e.target.value))} />
            </Cajas>

            <Boton
              onClick={async () => {
               
                await createEventMutation({ variables: {
                title: title,
                description: description,
                date: date,
                startHour: startHour,
                endHour: endHour,
                } });
                refetch() 
                
              
                
                          
             }}> CreateEvent </Boton>
                          
                    
            </Caja>

            
                
               
            

            
            <Caja>
                <Subtitle> Eventos</Subtitle>
                

             {events.length === 0 && <TEXTO>No hay eventos</TEXTO>}
                {
                    events.map((Event: {  
                        id: string;
                        title: string;
                        description: string;
                        date: Date;
                        startHour: number;
                        endHour: number;}) => {
                        return (
                            
                            <Cajas>
                                <TEXTO>{Event.title}/{Event.description}/{Event.date} /{Event.startHour}:00hs/ {Event.endHour}:00hs</TEXTO>
                  
                                <Boton
                                onClick={async () => {
                                    await deleteEventMutation({ variables: {
                                    id: Event.id,
                                    } });
                                    refetch()    
                                    
                                 }
                                 

                                }> Eliminar </Boton>

<Boton
                                onClick={async () => {
                                    await updateEventMutation({ variables: {
                                    
                                    id: Event.id,
                                   
                                    } });
                                    refetch()    
                                    
                                 }
                                 

                                }> Actualizar </Boton>


                                
                            </Cajas>
                        );
                    })
                }
            </Caja>

            </FLEX>
           
        </>
    );






}
export default Events;


const Title = styled.h1`
  display: flex;
  justify-content: center;
  font : bold 100% monospace;
  font-size: 50px;

`;

const Input = styled.input`
    display: flex;
    justify-content: center;
    font : bold 100% monospace;
    font-size: 20px;
    color: #e0aa59;
    border-radius: 15px;
    margin: 10px;
`;


const Subtitle = styled.h2`
    display: flex;
    justify-content: center;
    font : bold 100% monospace;
    font-size: 30px;
    color: #e0aa59;
`;

const Links = styled.a`
    display: flex;
    justify-content: center;
    font : bold 100% monospace;
    font-size: 25px;
    color: #e0aa59;
    &:hover {
        color: #705f46;
    }
`;

const Boton = styled.button`
    background-color: #e0aa59;
    border: none;
    color: white;
    padding: 15px 32px;
    margin: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 15px;
    &:hover {
        background-color: #705f46;
        color: white;
    }
`;
const FLEX = styled.div`
  display: flex;

  justify-content: center;
    align-items: center;
    
    flex-direction: column;
 
   
  

  background-color: #cdc69a;
`;

const Caja = styled.div`
  display: flex;

  justify-content: center;
    align-items: center;
    flex-direction: column;
  width: 20%;
    height: 20%;
    padding: 50px;
  

  background-color: #a08d0e;
`;

const Cajas = styled.div`
  display: flex;
  justify-content: center;
    align-items: center;

  flex-direction: column;
`;

const TEXTO = styled.p`
  font: bold 100% monospace;
  font-family: "Courier New", Courier, monospace;
  color: white;
  font-size: 20px;
  
`;
