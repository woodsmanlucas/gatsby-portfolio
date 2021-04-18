---
layout: post
title:  "Getting Started with Volley"
date: "2020-11-07"
categories: android Volley android-studio kotlin tech
---

This is my very first post so bear with me, and hopefully before anyone sees this it is a solid post. Recently I started learning android and since I've been having trouble finding so good content I figured I would make some as I go. Some people would describe this as the blind leading the blind but, I beg to differ. I think that some of the best teachers are those who are still learning because they understand that it is a process. So join me and lets see if we can make it through the forest on this android adventure.

So without further ado, let's get started.

For this article, I will be referencing the offical documentation: [https://developer.android.com/training/volley](https://developer.android.com/training/volley)

My coding environment is Ubuntu 20 but you can use Windows or Mac if you like. First things first start up **android studio** and create a new Empty activity:
![Empty Activity](/assets/2020-11-07-LearningVolley/EmptyActivity.png)

Then I saved my project like this:
![How I saved my project](/assets/2020-11-07-LearningVolley/LearningVolleySave.png)

To import volley as the official documentation says add the following lines to your build.gradle file.
{% highlight kotlin %}
dependencies {
    ...
    implementation 'com.android.volley:volley:1.1.1'
}
{% endhighlight %}
This is all fine and dandy but they don't tell you which build.gradle file. Turns out it is the Module build.gradle. You can see it here:
![The Build Gradle file](/assets/2020-11-07-LearningVolley/BuildGradle.png)
Or if you don't have that Gradle Scripts Tab with the little elephant you can find the gradle file in the app directory like this:
![The Build Gradle file under the project tab](/assets/2020-11-07-LearningVolley/BuildGradle2.png)

Then simply paste the implementation into the build.gradle file and hit the sync now button.

Now you are all set up to use volley.

**Alternatively you can clone volley from github**


{% highlight bash %}
$ git clone https://github.com/google/volley
{% endhighlight %}

Then you can import it into android studio by going to **File -> New -> Import Module ...**  . Then selecting the location of the module you are importing (Volley). Then if you go to that same build.gradle file (in the module as mentioned above) and add the following line:
{% highlight kotlin %}
dependencies {
    ...
    implementation project(':volley')
}
{% endhighlight %}

Now you are all ready to make some network requests in Kotlin with Volley. But first you might want to add internet permissions I explain that in my next post.
