// src/components/plan/PlanTimeline.tsx
// import React from 'react';
// import {
//   Timeline,
//   TimelineItem,
//   TimelineSeparator,
//   TimelineConnector,
//   TimelineContent,
//   TimelineDot,
//   TimelineOppositeContent
// } from '@mui/lab';
// import { Typography, Paper } from '@mui/material';
// import { format } from 'date-fns';

// interface TimelineItemData {
//   date: string;
//   time: string;
//   activity: string;
//   location: string;
// }

// interface PlanTimelineProps {
//   items: TimelineItemData[];
// }

// const PlanTimeline: React.FC<PlanTimelineProps> = ({ items }) => {
//   return (
//     <Timeline>
//       {items.map((item, index) => (
//         <TimelineItem key={index}>
//           <TimelineOppositeContent>
//             <Typography variant="body2" color="text.secondary">
//               {format(new Date(`${item.date} ${item.time}`), 'HH:mm')}
//             </Typography>
//           </TimelineOppositeContent>
//           <TimelineSeparator>
//             <TimelineDot />
//             {index < items.length - 1 && <TimelineConnector />}
//           </TimelineSeparator>
//           <TimelineContent>
//             <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
//               <Typography variant="h6" component="h3">
//                 {item.activity}
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 {item.location}
//               </Typography>
//             </Paper>
//           </TimelineContent>
//         </TimelineItem>
//       ))}
//     </Timeline>
//   );
// };

// export default PlanTimeline;
export { }