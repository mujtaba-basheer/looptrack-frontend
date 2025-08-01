import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useMediaQuery, useTheme } from "@mui/material";
import { colors } from "../styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useState } from "react";
import { AIInsights } from "./AIInsights";
import { TopCampaigns } from "./TopCampaigns";
import { MetaAdsOverview } from "./MetaAdsOverview";
import { GoogleAdsOverview } from "./GoogleAdsOverview";

const DashboardContainer = styled(Box)(({ theme }) => ({
  padding: "20px",
  backgroundColor: "#fafbfc",
  minHeight: "100%",
  [theme.breakpoints.down('md')]: {
    padding: "16px",
  },
  [theme.breakpoints.down('sm')]: {
    padding: "12px",
  },
}));

const MetricCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  border: `1px solid ${colors.gray200}`,
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.08)",
  backgroundColor: colors.baseWhite,
  position: "relative",
  "&:hover": {
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  [theme.breakpoints.down('sm')]: {
    borderRadius: "8px",
  },
}));

const ChartCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  border: `1px solid ${colors.gray200}`,
  boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.08)",
  backgroundColor: colors.baseWhite,
  height: "400px",
  "&:hover": {
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  [theme.breakpoints.down('lg')]: {
    height: "380px",
  },
  [theme.breakpoints.down('md')]: {
    height: "350px",
  },
  [theme.breakpoints.down('sm')]: {
    height: "300px",
    borderRadius: "8px",
  },
}));

const ChartHeader = styled(Box)(({ theme }) => ({
  padding: "20px 20px 0 20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down('sm')]: {
    padding: "16px 16px 0 16px",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
  },
}));

const MetricsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "24px",
  marginBottom: "24px",
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px",
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
    marginBottom: "20px",
  },
}));

const ChartsContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "24px",
  marginBottom: "24px",
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
  [theme.breakpoints.down('sm')]: {
    gap: "16px",
    marginBottom: "20px",
  },
}));

// More dots icon component
const MoreDotsIcon = () => (
  <Box
    component="svg"
    sx={{ width: 16, height: 16, color: colors.gray400 }}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
  </Box>
);

// Info icon component
const InfoIcon = () => (
  <Box
    component="svg"
    sx={{ width: 14, height: 14, color: colors.gray400 }}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </Box>
);

// Arrow up icon
const ArrowUpIcon = ({ color = colors.green500 }: { color?: string }) => (
  <Box
    component="svg"
    sx={{ width: 12, height: 12, color }}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
  </Box>
);

// Arrow down icon
const ArrowDownIcon = ({ color = colors.error500 }: { color?: string }) => (
  <Box
    component="svg"
    sx={{ width: 12, height: 12, color }}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
  </Box>
);

// Sample data for Revenue Trend chart
const revenueData = [
  { name: "Sep 23", value: 5000 },
  { name: "Oct 23", value: 8000 },
  { name: "Nov 23", value: 12000 },
  { name: "Dec 23", value: 15000 },
  { name: "Jan", value: 35687 },
  { name: "Feb", value: 25000 },
  { name: "Mar", value: 30000 },
  { name: "Apr", value: 28000 },
];

// Sample data for Revenue Attribution pie chart
const attributionData = [
  { name: "Meta", value: 18465.34, color: "#e91e63", percentage: 41.3 },
  { name: "Google", value: 15200.5, color: "#2196f3", percentage: 34.0 },
  { name: "Email", value: 6850.25, color: "#4caf50", percentage: 15.3 },
  { name: "Direct", value: 3250.75, color: "#ff9800", percentage: 7.3 },
  { name: "Other", value: 919.62, color: "#9c27b0", percentage: 2.1 },
];

const TimeFilterButton = styled(Button)<{ active?: boolean }>(({ active, theme }) => ({
  height: "32px",
  borderRadius: "6px",
  fontSize: "12px",
  fontWeight: 500,
  textTransform: "none",
  padding: "6px 12px",
  minWidth: "auto",
  backgroundColor: active ? colors.gray100 : "transparent",
  color: active ? colors.gray900 : colors.gray600,
  border: "none",
  "&:hover": {
    backgroundColor: colors.gray100,
  },
  [theme.breakpoints.down('sm')]: {
    height: "28px",
    fontSize: "11px",
    padding: "4px 8px",
  },
}));

export const DashboardContent = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const metrics = [
    {
      title: "Revenue",
      value: "$128,300",
      decimal: ".46",
      change: "+12.86%",
      changeText: "in the past week",
      isPositive: true,
    },
    {
      title: "Ad Spend",
      value: "$33,400",
      decimal: "",
      change: "+4.3%",
      changeText: "in the past week",
      isPositive: true,
    },
    {
      title: "ROAS",
      value: "3.2",
      decimal: "x",
      change: "+8.3%",
      changeText: "in the past week",
      isPositive: true,
    },
    {
      title: "Orders",
      value: "569",
      decimal: "",
      change: "-3.47%",
      changeText: "in the past week",
      isPositive: false,
    },
  ];

  // Calculate total for default center display
  const totalRevenue = attributionData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  // Get current display data (hovered segment or total)
  const getCurrentDisplayData = () => {
    if (hoveredSegment !== null && attributionData[hoveredSegment]) {
      const segment = attributionData[hoveredSegment];
      return {
        value: segment.value,
        name: segment.name,
        percentage: segment.percentage,
        isSegment: true,
        color: segment.color,
      };
    }

    return {
      value: totalRevenue,
      name: "Total Revenue",
      percentage: null,
      isSegment: false,
      color: colors.gray900,
    };
  };

  const displayData = getCurrentDisplayData();

  const handleMouseEnter = (_data: any, index: number) => {
    setHoveredSegment(index);
  };

  const handleMouseLeave = () => {
    setHoveredSegment(null);
  };

  return (
    <DashboardContainer>
      {/* Metrics Cards Row */}
      <MetricsContainer>
        {metrics.map((metric, index) => (
          <MetricCard key={index}>
            <CardContent sx={{ padding: { xs: "16px", sm: "20px" } }}>
              <Stack spacing={{ xs: 1.5, sm: 2 }}>
                {/* Header */}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "13px", sm: "14px" },
                        fontWeight: 500,
                        color: colors.gray600,
                      }}
                    >
                      {metric.title}
                    </Typography>
                    <InfoIcon />
                  </Stack>
                  <IconButton size="small" sx={{ color: colors.gray400 }}>
                    <MoreDotsIcon />
                  </IconButton>
                </Stack>

                {/* Value */}
                <Box>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: { xs: "24px", sm: "28px", md: "32px" },
                      fontWeight: 700,
                      color: colors.gray900,
                      lineHeight: 1,
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {metric.value}
                    <Box
                      component="span"
                      sx={{
                        fontSize: { xs: "18px", sm: "20px", md: "24px" },
                        color: colors.gray500,
                        fontWeight: 400,
                      }}
                    >
                      {metric.decimal}
                    </Box>
                  </Typography>
                </Box>

                {/* Change Indicator */}
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  {metric.isPositive ? (
                    <ArrowUpIcon color={colors.green500} />
                  ) : (
                    <ArrowDownIcon color={colors.error500} />
                  )}
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "11px", sm: "12px" },
                      fontWeight: 500,
                      color: metric.isPositive
                        ? colors.green600
                        : colors.error600,
                    }}
                  >
                    {metric.change}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: "11px", sm: "12px" },
                      color: colors.gray500,
                    }}
                  >
                    {isMobile ? "past week" : metric.changeText}
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </MetricCard>
        ))}
      </MetricsContainer>

      {/* Charts Row */}
      <ChartsContainer>
        {/* Revenue Trend Chart */}
        <ChartCard>
          <ChartHeader>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "14px", sm: "16px" },
                  fontWeight: 600,
                  color: colors.gray900,
                }}
              >
                Revenue Trend
              </Typography>
              <InfoIcon />
            </Stack>
            <Stack direction="row" spacing={1}>
              {["1M", "YTD", "1Y", "Max"].map((period) => (
                <TimeFilterButton key={period} active={period === "1M"}>
                  {period}
                </TimeFilterButton>
              ))}
            </Stack>
          </ChartHeader>
          <Box sx={{ 
            padding: { xs: "0 12px 12px 12px", sm: "0 20px 20px 20px" }, 
            height: { xs: "240px", sm: "280px", md: "320px" }
          }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.gray200} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12, fill: colors.gray500 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: isMobile ? 10 : 12, fill: colors.gray500 }}
                  tickFormatter={(value) => `${value / 1000}K`}
                />
                <Tooltip
                  formatter={(value: any) => [
                    `${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                  labelStyle={{ color: colors.gray900 }}
                  contentStyle={{
                    backgroundColor: colors.baseWhite,
                    border: `1px solid ${colors.gray200}`,
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={colors.blue500}
                  strokeWidth={isMobile ? 2 : 3}
                  dot={{ fill: colors.blue500, strokeWidth: 2, r: isMobile ? 3 : 4 }}
                  activeDot={{ r: isMobile ? 5 : 6, stroke: colors.blue500, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </ChartCard>

        {/* Revenue Attribution Chart */}
        <ChartCard>
          <ChartHeader>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "14px", sm: "16px" },
                  fontWeight: 600,
                  color: colors.gray900,
                }}
              >
                Revenue Attribution
              </Typography>
              <InfoIcon />
            </Stack>
            {!isMobile && (
              <Button
                sx={{
                  fontSize: "12px",
                  fontWeight: 500,
                  color: colors.gray600,
                  textTransform: "none",
                  padding: "4px 8px",
                }}
              >
                Expand
              </Button>
            )}
          </ChartHeader>
          <Box
            sx={{
              padding: { xs: "0 12px 12px 12px", sm: "0 20px 20px 20px" },
              height: { xs: "240px", sm: "280px", md: "320px" },
              position: "relative",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 40 : 60}
                  outerRadius={isMobile ? 70 : 100}
                  paddingAngle={2}
                  dataKey="value"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {attributionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke={
                        hoveredSegment === index ? colors.baseWhite : "none"
                      }
                      strokeWidth={hoveredSegment === index ? 3 : 0}
                      style={{
                        filter:
                          hoveredSegment !== null && hoveredSegment !== index
                            ? "brightness(0.7)"
                            : "brightness(1)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: any) => [
                    `${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                  contentStyle={{
                    backgroundColor: colors.baseWhite,
                    border: `1px solid ${colors.gray200}`,
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    fontSize: isMobile ? "12px" : "14px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            {/* Dynamic Center content */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                transition: "all 0.3s ease",
                pointerEvents: "none",
              }}
            >
              {displayData.isSegment ? (
                // Show individual segment data
                <>
                  <Typography
                    sx={{
                      fontSize: { xs: "10px", sm: "12px" },
                      fontWeight: 500,
                      color: colors.gray600,
                      marginBottom: "4px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {displayData.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "16px", sm: "20px", md: "24px" },
                      fontWeight: 700,
                      color: displayData.color,
                      lineHeight: 1,
                    }}
                  >
                    ${displayData.value.toLocaleString()}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: "12px", sm: "14px" },
                      fontWeight: 600,
                      color: colors.gray600,
                      marginTop: "4px",
                    }}
                  >
                    {displayData.percentage}% of total
                  </Typography>
                </>
              ) : (
                // Show total revenue data
                <>
                  <Typography
                    sx={{
                      fontSize: { xs: "16px", sm: "20px", md: "24px" },
                      fontWeight: 700,
                      color: colors.gray900,
                      lineHeight: 1,
                    }}
                  >
                    ${Math.floor(displayData.value).toLocaleString()}
                    <Box
                      component="span"
                      sx={{ fontSize: { xs: "12px", sm: "14px", md: "16px" }, color: colors.gray500 }}
                    >
                      .
                      {((displayData.value % 1) * 100)
                        .toFixed(0)
                        .padStart(2, "0")}
                    </Box>
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={0.5}
                    sx={{ marginTop: "4px" }}
                  >
                    <ArrowUpIcon color={colors.green500} />
                    <Typography
                      sx={{
                        fontSize: { xs: "9px", sm: "11px" },
                        fontWeight: 500,
                        color: colors.green600,
                      }}
                    >
                      $2,235 (5.26%)
                    </Typography>
                  </Stack>
                  <Typography
                    sx={{
                      fontSize: { xs: "8px", sm: "10px" },
                      color: colors.gray500,
                      marginTop: "2px",
                    }}
                  >
                    in the past day
                  </Typography>
                </>
              )}
            </Box>

            {/* Dynamic callout that appears only when hovering (desktop only) */}
            {hoveredSegment !== null && !isMobile && (
              <Box
                sx={{
                  position: "absolute",
                  top: "40px",
                  right: "20px",
                  backgroundColor: colors.baseWhite,
                  padding: "8px 12px",
                  borderRadius: "8px",
                  border: `2px solid ${attributionData[hoveredSegment].color}`,
                  boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.15)",
                  transition: "all 0.2s ease",
                  zIndex: 10,
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: attributionData[hoveredSegment].color,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "11px",
                      color: colors.gray700,
                      fontWeight: 600,
                    }}
                  >
                    {attributionData[hoveredSegment].name}
                  </Typography>
                </Stack>
                <Typography
                  sx={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: colors.gray900,
                    marginTop: "4px",
                  }}
                >
                  ${attributionData[hoveredSegment].value.toLocaleString()}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "10px",
                    color: colors.gray500,
                  }}
                >
                  {attributionData[hoveredSegment].percentage}% of revenue
                </Typography>
              </Box>
            )}
          </Box>

          {/* Legend for mobile */}
          {isMobile && (
            <Box sx={{ px: 2, pb: 2 }}>
              <Stack spacing={1}>
                {attributionData.map((item) => (
                  <Stack key={item.name} direction="row" alignItems="center" spacing={1}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: item.color,
                      }}
                    />
                    <Typography sx={{ fontSize: "12px", color: colors.gray700, flex: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography sx={{ fontSize: "12px", fontWeight: 600, color: colors.gray900 }}>
                      {item.percentage}%
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}
        </ChartCard>
      </ChartsContainer>

      {/* Additional Content - Import your existing components */}
      <AIInsights />
      <TopCampaigns />
      <MetaAdsOverview />
      <GoogleAdsOverview />
    </DashboardContainer>
  );
};