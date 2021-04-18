---
layout: post
title:  "A simple post in Volley"
date: "2020-11-10"
categories: android Volley android-studio kotlin tech
---

This is a continuation to my series on Volley. If you read my previous posts ([the first](https://woodsmanlucas.github.io/android/volley/android-studio/kotlin/2020/11/07/Getting-Started-with-Volley.html) and [the second](https://woodsmanlucas.github.io/2020/11/09/Volley-a-simple-get-request.html)) hopefully you are starting to get a grasp of how Volley works. Maybe you even did some side reading in the official documentation and have a great understanding. And maybe if I'm lucky you even noticed that in the get request we specify the method in the String request:
{% highlight kotlin %}
    val stringRequest = StringRequest(Request.Method.GET, url, ...
{% endhighlight %}
So this post is going to be about how to make a post request so lets change that right now to this:
{% highlight kotlin %}
    val stringRequest = StringRequest(Request.Method.POST, url, ...
{% endhighlight %}
I also went ahead and changed the url to that of my site [sonarmusic.social](https://sonarmusic.social) but, you can use any post link:
{% highlight kotlin %}
    val url = "https://www.sonarmusic.social/api/auth/register"
{% endhighlight %}
Next I added the json body just below the url:
{% highlight kotlin %}
    val url = "https://www.google.com"
    val jsonBody = JSONObject()
    jsonBody.put("email", "lucas@sonarmusic.social")
    jsonBody.put("username", "Lucas")
    jsonBody.put("firstName", "Lucas")
    jsonBody.put("lastName", "Johnson")
    jsonBody.put("password", "P@ssw0rd")
    jsonBody.put("userType", "user")
    val requestBody = jsonBody.toString()
{% endhighlight %}

Now in order to override the functions within the string request and add in the body to the function we have to declare the string request as an object:

{% highlight kotlin %}
    val stringRequest = object : StringRequest(Request.Method.POST, url, ...
{% endhighlight %}

Then lets override the functions and add in a body!

{% highlight kotlin %}
    val stringRequest = object : StringRequest(Request.Method.POST, url, ...) {
            override fun getBodyContentType(): String {
                return "application/json"
            }
            @Throws(AuthFailureError::class)
            override fun getBody(): ByteArray {
                return requestBody.toByteArray()
            }
    }
{% endhighlight %}

Notice that I added a content type to the request as well. Now let's run this and see if it works.

![My First Try didn't work...](/static/assets/2020-11-10-SimplePost/FirstTry.png)

Now its kind of hard to read but it says "That didn't work". I guess we are hitting our error statement. Notice it also says "Unexpected response code 400". We all know what that means... Bad Data. Let's see if we can add in a couple more lines and get to the bottom of this.
{% highlight kotlin %}
Response.ErrorListener { error ->
val responseBody = String(error.networkResponse.data, UTF_8)
println(responseBody)
})
{% endhighlight %}
Again we will have to hit alt-Enter on this UTF_8 to import the character type. Now lets run again and see what happens:

![Now we can see what is going on](/static/assets/2020-11-10-SimplePost/TryingAgainWithErrors.png)

Oh boy, looks like my email already exists! Let's try again with a different email. If your not a musician and aren't planning on using sonar please login and delete your account once you are done. And on that note of spectacular failure I'm going to leave you to get your post running as an exercise. If you have any problems you can tweet me and I will try to get back to you as soon as reasonably possible.


