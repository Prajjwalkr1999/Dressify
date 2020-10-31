import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShareIcon from '@material-ui/icons/Share';

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
    width: "300px",
    height: "400px",
  },
  cardContent: {
    flexGrow: 1,
  },
  expand: {
    marginLeft: 'auto',
  },
  algn:{
    margin: "auto",
    width: "50%",
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
              image={this.props.img["image-url"]}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              {/* <Typography gutterBottom variant="h5" component="h2">
                {this.props.img.celeb}
              </Typography> */}
              {/* <Typography>type</Typography> */}
            </CardContent>
            <CardActions disableSpacing>
            <Button 
              startIcon ={<AddShoppingCartIcon/>}
              size="small" 
              color="primary">
                Buy
              </Button>
              <Button 
              className = {classes.algn}
              startIcon ={<FavoriteIcon/>}
              size="small" 
              color="primary">
                WishList
              </Button>
              <Button 
              className = {classes.expand}
              startIcon ={<ShareIcon/>}
              size="small" 
              color="primary">
                Share
              </Button>              
            </CardActions>
          </Card>
    </Grid>
    </div>
    );
  }
}

export default withStyles(useStyles)(Clothes);
