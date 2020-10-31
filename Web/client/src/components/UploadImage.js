import React, { Component } from "react";
import { withFirebase } from "./Firebase";
import Link from "react-router-dom/Link";

class UploadImage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            ele : [],
            imageUrl : [],
        }
      }
      onSubmit = (event) =>{
          console.log('button');
          console.log(this.state.ele);
          console.log(this.state.ele[0].file);
          var imagetempUrl=[];
          this.state.ele.map((val,id,ar)=>{
            const uploadTask = this.props.firebase.storage
                .ref(`/suggestions/kiara/${val.name}`)
                .put(val);
            console.log(val);
            uploadTask.on(
                "state_changed",
                (snapShot) => {
                    //takes a snap shot of the process as it is happening
                    console.log(snapShot);
                },
                (err) => {
                    //catches the errors
                    console.log(err);
                },
                ()=>{
                    this.props.firebase.storage
                        .ref("suggestions/kiara")
                        .child(val.name)
                        .getDownloadURL()
                        .then((fireBaseUrl) => {
                            console.log(fireBaseUrl);
                            imagetempUrl.push(fireBaseUrl);

                            // const userId = this.props.firebase.auth.currentUser.uid;
                            
                            this.props.firebase.db
                            .doc(`/suggestions/${val.name}`).set({
                                celeb: "Kiara_Advani",
                                gender: "Female",
                                "image-url": fireBaseUrl 
                            })
                            .then(function() {
                                console.log("Document successfully written!");
                            })
                            .catch(function(error) {
                                console.error("Error writing document: ", error);
                            });
                            
                        });
                        // this.setState({ imageUrl: imagetempUrl });
                }
            )
          })
      }
      imageChange = (event) => {
        var temp=[];  
        for(let i=0;i<event.target.files.length;i++){
            const imageFile=(event.target.files[i]);
            temp.push(imageFile);
            console.log(imageFile);
            // this.setState({ele : temp});
        }

        console.log(temp);
        this.setState({ele : temp})
      };
      
      render() {
          console.log(this.state.ele);
          return (
            <div>
                <input type="file" multiple onChange={this.imageChange}/>
                {/* {this.state.ele.map((val,id,ar)=>{
                    (<h1>{val.File.name}</h1>)
                })} */}
                <button onClick = {this.onSubmit}>
                    Upload
                </button>
            </div>
          );
      }
}

export default withFirebase(UploadImage);