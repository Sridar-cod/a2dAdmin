import { connectMongo } from "@/utils/connectMongodb";
import enquiryModel from "@/models/enquiryModel"; 

export async function GET() {
  try {
    await connectMongo()
    const enquiries = await enquiryModel.find({})
    return Response.json(enquiries)
  } catch (err) {
    return Response.json({message:err.message})
  }
 
}
