package com.example.dresstify

import android.R.attr.password
import android.content.Intent
import android.os.Bundle
import android.text.Editable
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser


val TAG : String = "RegisterActivity"

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        supportActionBar?.title = "Dressify"

        val loginbttn: Button = findViewById(R.id.login_bttn_id)

        loginbttn.setOnClickListener{
            onLogin()
        }

        val signup: TextView = findViewById(R.id.signup_id)
        signup.setOnClickListener{
            onSignup()
        }





    }

    private fun onSignup(){

        val intent = Intent(this,SetUpProfile::class.java)
        startActivity(intent)
    }

    private fun onLogin(){

        val email_id:EditText = findViewById(R.id.editTextTextEmailAddress)
        val passsword_id:EditText = findViewById(R.id.editTextTextPassword)

        val email: String = email_id.text.toString()
        val password:String = passsword_id.text.toString()

        val mAuth = FirebaseAuth.getInstance()

        mAuth.signInWithEmailAndPassword(email, password)
            .addOnCompleteListener(this,
                OnCompleteListener<AuthResult?> { task ->
                    if (task.isSuccessful) {
                        // Sign in success, update UI with the signed-in user's information
                        Log.d(TAG, "signInWithEmail:success $email , $password")

                        val intent = Intent(this,User_Page::class.java)
                        startActivity(intent)

//                        val user: FirebaseUser = mAuth.getCurrentUser()
//                        updateUI(user)
                    } else {
                        // If sign in fails, display a message to the user.
                        Log.w(TAG, "signInWithEmail:failure", task.exception)
                        Toast.makeText(
                            this, "Authentication failed.",
                            Toast.LENGTH_SHORT
                        ).show()
                    }

                    // ...
                })
    }
}