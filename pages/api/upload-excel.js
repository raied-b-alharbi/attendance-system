import { PrismaClient } from '@prisma/client'; import ExcelJS from 'exceljs'; import formidable from 'formidable';
export const config = { api: { bodyParser: false } };
const prisma = new PrismaClient();
export default async function handler(req,res){ if(req.method!=='POST') return res.status(405).end();
const form = new formidable.IncomingForm();
form.parse(req, async (err, fields, files) => { if(err) return res.status(500).json({error:'Error parsing file'});
const file = files.file; const workbook = new ExcelJS.Workbook(); await workbook.xlsx.readFile(file.filepath); const worksheet = workbook.worksheets[0];
const rows = []; worksheet.eachRow({ includeEmpty: false }, (row,rowNumber)=>{ if(rowNumber===1) return; rows.push({name:row.getCell(1).value,date:row.getCell(2).value,status:row.getCell(3).value,notes:row.getCell(4).value||''});});
for(const r of rows){ let employee = await prisma.employee.findFirst({where:{name:r.name}}); if(!employee){ employee = await prisma.employee.create({data:{name:r.name,position:'',active:true}});}
await prisma.attendance.create({data:{employeeId:employee.id,date:new Date(r.date),status:r.status,notes:r.notes,createdBy:1}});} res.status(200).json({message:'Excel uploaded successfully'});}); }