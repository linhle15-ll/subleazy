// 'use client';

// import { useRouter } from 'next/navigation';
// import { SelectionBox } from '@/components/ui/selection-box/selection-box';
// import { usePostEditorStore } from '@/lib/stores/post.editor.store';
// import { Button } from '@/components/ui/button';

// const hours = Array.from({ length: 12 }, (_, i) => i + 1);
// const minutes = ['00', '15', '30', '45'];
// const ampm = ['AM', 'PM'];

// function formatTimeString(
//   hour: number,
//   minute: string,
//   ampmVal: string
// ): string {
//   return `${hour.toString().padStart(2, '0')}:${minute} ${ampmVal}`;
// }

// function parseTimeString(timeStr: string | undefined): {
//   hour: number;
//   minute: string;
//   ampm: string;
// } {
//   if (!timeStr) return { hour: 12, minute: '00', ampm: 'AM' };

//   // Split only on the first space to get time and AM/PM
//   const [time, ampm] = timeStr.split(' ');
//   const [hour, minute] = time.split(':');

//   return {
//     hour: parseInt(hour),
//     minute: minute || '00',
//     ampm: ampm || 'AM',
//   };
// }

// export default function SubleaseFormAvailability() {
//   const { post, setPost } = usePostEditorStore();
//   const availability = post.availability || {};

// //   const handleCheckInTimeChange = (
// //     field: 'checkinTime' | 'checkoutTime',
// //     value: string
// //   ) => {
// //     setPost('availability', {
// //       ...availability,
// //       [field]: value,
// //     });
// //   };

// //   const handleSubmit = async () => {
// //       const formData = usePostEditorStore.getState();

// //       // Add required availability dates if not present
// //       const submissionData = {
// //         ...formData,
// //         availability: {
// //           ...formData.availability,
// //           startDate:
// //             formData.availability?.startDate || new Date().toISOString(),
// //           endDate:
// //             formData.availability?.endDate ||
// //             new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Default to 30 days from now
// //         },
// //       };
// //     }};

//   return (
//     <div className="flex flex-col gap-6 relative mb-15">
//       {/* Check-in/Check-out Times */}
//       <div className="mb-6">
//         <div className="font-medium text-lg mb-2">Check-in/Check-out Times</div>
//         <div className="flex flex-row items-center justify-center gap-4 w-full h-28 pl-5 pr-5 border-2 rounded-xl text-lg text-center font-medium border-gray-400">
//           <span>Check-in time</span>
//           <select
//             aria-label="Check-in hour"
//             value={parseTimeString(availability?.checkinTime).hour}
//             onChange={(e) => {
//               const hour = Number(e.target.value);
//               const { minute, ampm } = parseTimeString(
//                 availability?.checkinTime
//               );
//               handleCheckTimeChange(
//                 'checkinTime',
//                 formatTimeString(hour, minute, ampm)
//               );
//             }}
//             className="form-dropdown-box"
//           >
//             {hours.map((h) => (
//               <option key={h} value={h}>
//                 {h}
//               </option>
//             ))}
//           </select>
//           :
//           <select
//             aria-label="Check-in minute"
//             value={parseTimeString(availability?.checkinTime).minute}
//             onChange={(e) => {
//               const { hour, ampm } = parseTimeString(availability?.checkinTime);
//               const minute = e.target.value;
//               handleCheckTimeChange(
//                 'checkinTime',
//                 formatTimeString(hour, minute, ampm)
//               );
//             }}
//             className="form-dropdown-box"
//           >
//             {minutes.map((m) => (
//               <option key={m} value={m}>
//                 {m}
//               </option>
//             ))}
//           </select>
//           <select
//             aria-label="Check-in AM/PM"
//             value={parseTimeString(availability?.checkinTime).ampm}
//             onChange={(e) => {
//               const { hour, minute } = parseTimeString(
//                 availability?.checkinTime
//               );
//               handleCheckTimeChange(
//                 'checkinTime',
//                 formatTimeString(hour, minute, e.target.value)
//               );
//             }}
//             className="form-dropdown-box"
//           >
//             {ampm.map((a) => (
//               <option key={a} value={a}>
//                 {a}
//               </option>
//             ))}
//           </select>
//           <span>Check-out time</span>
//           <select
//             aria-label="Check-out hour"
//             value={parseTimeString(availability?.checkoutTime).hour}
//             onChange={(e) => {
//               const hour = Number(e.target.value);
//               const { minute, ampm } = parseTimeString(
//                 availability?.checkoutTime
//               );
//               handleCheckTimeChange(
//                 'checkoutTime',
//                 formatTimeString(hour, minute, ampm)
//               );
//             }}
//             className="form-dropdown-box"
//           >
//             {hours.map((h) => (
//               <option key={h} value={h}>
//                 {h}
//               </option>
//             ))}
//           </select>
//           :
//           <select
//             aria-label="Check-out minute"
//             value={parseTimeString(availability?.checkoutTime).minute}
//             onChange={(e) => {
//               const { hour, ampm } = parseTimeString(
//                 availability?.checkoutTime
//               );
//               const minute = e.target.value;
//               handleCheckTimeChange(
//                 'checkoutTime',
//                 formatTimeString(hour, minute, ampm)
//               );
//             }}
//             className="form-dropdown-box"
//           >
//             {minutes.map((m) => (
//               <option key={m} value={m}>
//                 {m}
//               </option>
//             ))}
//           </select>
//           <select
//             aria-label="Check-out AM/PM"
//             value={parseTimeString(availability?.checkoutTime).ampm}
//             onChange={(e) => {
//               const { hour, minute } = parseTimeString(
//                 availability?.checkoutTime
//               );
//               handleCheckTimeChange(
//                 'checkoutTime',
//                 formatTimeString(hour, minute, e.target.value)
//               );
//             }}
//             className="form-dropdown-box"
//           >
//             {ampm.map((a) => (
//               <option key={a} value={a}>
//                 {a}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }
