import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Link } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function MajorCard(props: any) {
  const [expanded, setExpanded] = React.useState(false);
  const { majorName, officialPageLink, studyPlanLink } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 500, backgroundColor: "#DDCFBC", width: '60%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <CardContent>
        <Typography variant="h5" sx={{ color: "#18171B" }}>
          {majorName}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
            <Link href="/">
          <Typography sx={{ marginBottom: 2 }}>
            Listado de cátedras
          </Typography>
          </Link>
          <Typography sx={{ marginBottom: 2 }}>
            {officialPageLink}
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            {studyPlanLink}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}