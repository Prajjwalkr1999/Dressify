package com.example.dresstify

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class Stats : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_stats)

        supportActionBar?.title = "Stats"
        supportActionBar?.setDisplayHomeAsUpEnabled(true)
    }
}