// src/components/MatchingResultPage.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import ZoomURLText from "./ZoomURLText";
import ActionButton from "./ActionButton";
import MemberList from "./MemberList";
import { ZoomUrlResponse } from "../lib/type";
interface MatchingResultPageProps extends ZoomUrlResponse {
  // ZoomUrlResponseのuserName, theme, zoomUrlを受け取る
  sessionId: string;
  userIds: string[];
}

export default function MatchingResultPage(props: MatchingResultPageProps) {
  const { sessionId, userIds, userName, theme, zoomUrl } = props;
  return (
    <div>
      {/* コンテンツエリア */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: 4,
        }}
      >
        {/* マッチングしましたテキスト */}
        <Typography
          variant="h3"
          sx={{ color: "#F00033", mb: 4, fontWeight: "bold" }}
        >
          マッチングしました！
        </Typography>
        {/* テーマ */}
        <Typography variant="h5" sx={{ mb: 4 }}>
          テーマ: {theme}
        </Typography>
        {/* メンバーリスト */}
        <MemberList members={userName} />

        {/* Zoom URL */}
        <ZoomURLText zoomUrl={zoomUrl} />

        {/* ボタンエリア */}
        <ActionButton zoomUrl={zoomUrl} sessionId={sessionId} userIds={userIds} userName={userName} />
      </Box>
    </div>
  );
}
