// import { NextResponse } from "next/server";
// import { getFromFirestore } from "@/lib/firebase";
// import { sendPdfEmail } from "@/lib/mailer";

// export async function POST(request: Request) {
//   try {
//     const { id, email } = await request.json();

//     if (!id || !email) {
//       return NextResponse.json(
//         { message: "Missing required parameters" },
//         { status: 400 }
//       );
//     }

//     // Get the PDF data
//     const result = await getFromFirestore("previews", id);

//     if (!result.success) {
//       return NextResponse.json({ message: "PDF not found" }, { status: 404 });
//     }

//     const data = result.data;

//     // Check if the PDF is paid for
//     if (!data.isPaid) {
//       return NextResponse.json(
//         { message: "PDF has not been purchased" },
//         { status: 403 }
//       );
//     }

//     // Check if the PDF has expired
//     const expiresAt = data.expiresAt.toDate();
//     if (new Date() > expiresAt) {
//       return NextResponse.json({ message: "PDF has expired" }, { status: 410 });
//     }

//     // Send the email
//     const emailResult = await sendPdfEmail(email, data.actualPdfUrl, expiresAt);

//     if (!emailResult.success) {
//       return NextResponse.json(
//         { message: "Failed to send email" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({
//       message: "Email sent successfully",
//     });
//   } catch (error) {
//     console.error("Error sending PDF email:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
