---
layout: post
title:  "A simple Volley Request"
date: "2020-11-09"
categories: android Volley android-studio kotlin tech
---

Hey so, today I'm going to go over how to make a simple http get request in Volley. I will be following this [page](https://developer.android.com/training/volley/simple).

First, we will have to enable internet permissions. This will allow us to communicate with the internet with Volley. So add this line to your AndroidManifest.xml file.

{% highlight kotlin %}
    <uses-permission android:name="android.permission.INTERNET" />
{% endhighlight %}

I placed inside the manifest tag just above my application tag. You should be able to place it anywhere as long as it is not in the application tag & as long as it is inside the manifest tag.

The next step is the request itself. I will essentially just follow the official documentation I sited above for this. Lets start by adding a new request Queue. You can make one manually which allows you to have a more fine grained control over the queue itself, but I will just be using the newRequestQueue function that volley provides. To read more about making a RequestQueue manually go [here](https://developer.android.com/training/volley/requestqueue).

{% highlight kotlin %}
    val queue = Volley.newRequestQueue(this)
{% endhighlight %}

Note that the keyword **this** is the activity that you are working in so if you put this code in a fragment it will not work. I will go back and explain how to fix that issue in a later post.

Now we will instantiate the url and make the post. I will be using a print statement but the tutorial I am following uses a textView so that may be worth noting.

{% highlight kotlin %}
    val queue = Volley.newRequestQueue(this)
    val url = "https://www.google.com"

    // Request a response from the provided URL.
    val stringRequest = StringRequest(Request.Method.GET, url,
        Response.Listener<String> { response ->
            // Display the first 500 characters of the response string.
            println("Response is: ${response.substring(0, 500)}")
        },
        Response.ErrorListener { println("That didn't work!" )})

    // Add the request to the RequestQueue (and run the request.)
    queue.add(stringRequest)
{% endhighlight %}

Be ready with alt-Enter to add the required dependencies into your Activity. In case you have any problems with that here is what my imports look like:
{% highlight kotlin %}
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.StringRequest
import com.android.volley.toolbox.Volley
{% endhighlight %}

Then wah-la we have a response:
![An http response](/assets/2020-11-10-SimpleGet/Response.png)

Oh and also in case someone stops the activity you might want to add this code:
{% highlight kotlin %}
protected fun onStop() {
    super.onStop()
    requestQueue?.cancelAll(TAG)
}
{% endhighlight %}
