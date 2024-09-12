import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import Link from 'next/link'; // Linkのインポート

export default function Header() {
  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // テキストを中央揃え
        backgroundColor: "#F00033", // 背景色をF00033に設定
        color: "white", // テキストの色を白に設定
        padding: "5px",
        marginBottom: "0",
        zIndex: 100,
        height: "55px", // ヘッダーの高さを55ピクセルに設定
      }}
    >
      <Link href="/" passHref> {/* LinkコンポーネントでTypographyをラップ */}
        <Typography 
          variant="h3" 
          component="div" 
          sx={{ cursor: "pointer" }} // クリック可能であることを示すためにポインタ表示
        >
          docomo GD
        </Typography>
      </Link>
    </Box>
  );
}
