import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const useStyles = {
  cardGrid: {
    paddingTop: "8px",
    paddingBottom: "8px",
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    margin: "10px",
  },
  cardMedia: {
    width: "auto",
    height: "200px",
  },
  cardContent: {
    flexGrow: 1,
  },
};

class Clothes extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid id={this.props.id} item>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={this.props.img.["image-url"]}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.img.celeb}
              </Typography>
              <Typography>type</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Buy
              </Button>
            </CardActions>
          </Card>
    </Grid>
    </div>
    );
  }
}

export default withStyles(useStyles)(Clothes);
