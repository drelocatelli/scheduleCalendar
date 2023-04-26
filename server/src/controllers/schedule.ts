import { PrismaClient, Schedule } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

class ScheduleController {

    static async index(req: Request, res: Response) {
        try {
            const response = await prisma.schedule.findMany({});

            console.log(response);

            res.status(200).json({msg: 'Listing all schedules', response});

        } catch(err : any) {
            console.log(err);
            res.status(err?.status ?? 500).json({msg: err?.meta?.cause ?? 'An error occurred, please try again.'});
        }
    }

    static async create(req: Request, res: Response) : Promise<void> {
        try {
            const data = req.body as Schedule;
            
            const response = await prisma.schedule.create({data});

            res.status(201).json({msg: 'Schedule created!', response})
            
        } catch(err : any) {
            console.log(err);
            res.status(err?.status ?? 500).json({msg: err?.meta?.cause ?? 'An error occurred, please try again.'});
        }
    }

    static async update(req: Request, res: Response) : Promise<void> {
        try {
            const data = req.body as Schedule;
            
            const response = await prisma.schedule.update({
                where: {
                    id: req.params.id
                },
                data
            });

            res.status(201).json({msg: 'Schedule created!', response})
            
        } catch(err : any) {
            console.log(err);
            res.status(err?.status ?? 500).json({msg: err?.meta?.cause ?? 'An error occurred, please try again.'});
        }
    }

    static async destroy(req: Request, res: Response) : Promise<void> {
        try {

            await prisma.schedule.delete({ where: {id: req.params.id} })
            
            res.status(200).json({msg: 'Schedule deleted!'});
            
        } catch(err : any) {
            console.log(err);
            res.status(err?.status ?? 500).json({msg: err?.meta?.cause ?? 'An error occurred, please try again.'});
        }
    }

}

export default ScheduleController;