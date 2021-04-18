---
layout: post
title:  "Setting up Nivdia CUDA on Ubunutu server"
date: "2020-12-23"
categories: CUDA Nividia MachineLearning Systems tech
---

I've been having an interest in machine learning lately and wanted to configure my own server for doing machine learning on. This tutorial will assume you have a decent grasp on the command line and that you figured out how to install ubuntu server fresh. When installing ubuntu server it will ask you if you want to install docker. If you want to say yes it didn't work for me but my installer had an error in it so maybe that's why. Just in case though this tutorial will explain how to install docker (basically it is just go to the site and follow the directions but if you just google around you can get lost).

Disclaimer I'm still learning but hopefully this helps. Also this tutorial only works if you have one of the following gpus: NVIDIA TITAN V, TITAN Xp, TITAN X (Pascal), NVIDIA Quadro GV100, GP100 and P6000, NVIDIA DGX. Otherwise go [here](https://www.tensorflow.org/install/gpu)

The first step in this tutorial is to go to the [Nvidia site](https://www.nvidia.com/Download/index.aspx?lang=en-us) and download the correct driver for your GPU and for your OS. As outlined in the [Nvidia Documentation](https://docs.nvidia.com/cuda/cuda-installation-guide-linux/index.htm) you can check your Nvidia card by running the following command on your server:
{% highlight bash %}
$ lspci | grep -i nvidia
{% endhighlight %}

You will want a relatively new GPU and you can check if it is compatible with CUDA [here](https://developer.nvidia.com/cuda-gpus)

Now copy the driver onto your server. I used secure copy (scp) it looked something like this:
{% highlight bash %}
$ scp lucas@192.168.0.20:~/nvidia-driver.run /Users/lucas/Desktop/NVIDIA-Linux-x86_64-450.80.02.run
{% endhighlight %}
Note that I'm on Mac and my file is on the desktop. Also note that my server ip is a lan ip and it is 192.168.0.20 (I statically configured the ip in my router so I don't have to keep finding the server address). This command will vary depending on your system.

Then I logged back into the server and ran the driver but it didn't work. I forgot to disable nouveau.

To disable nouveau I created a file /usr/lib/modprobe.d/blacklist-nouveau.conf with nano:
{% highlight bash %}
$ sudo nano /usr/lib/modprobe.d/blacklist-nouveau.conf
{% endhighlight %}

Then I added the following contents (as per the documentation listed above:
{% highlight dockerfile %}
blacklist nouveau
options nouveau modeset=0
{% endhighlight %}

Then I ran the following command:
{% highlight bash %}
$ sudo update-initramfs -u
{% endhighlight %}

Also while I was at it I installed gcc which is a dependency of CUDA. I don't think the driver depends on it tho. And I installed make which the driver depends on.
{% highlight bash %}
$ sudo apt install gcc
$ gcc --version
$ sudo apt install make
{% endhighlight %}

Then I ran the script again with
{% highlight bash %}
$ sudo sh ./nvidia-driver.run
{% endhighlight %}

Then I installed docker as the site recommends [here](https://docs.docker.com/engine/install/ubuntu/). I had some issues with the previous install from snap (don't get me wrong snap is great when it works) but, I got those figured out.

Then I installed nvidia-docker2 as per [here](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/install-guide.html). Those commands were:
{% highlight bash %}
$ distribution=$(. /etc/os-release;echo $ID$VERSION_ID)    && curl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -    && curl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list
$ sudo apt-get update
$ sudo apt-get install nvidia-docker2
$ sudo systemctl restart docker
{% endhighlight %}

Then the next thing to do is to install CUDA. I followed the instructions [here](https://developer.nvidia.com/cuda-downloads) for ubuntu this is kind of tricky because you can't restart after the install or else you'll end up with ubuntu desktop. I found this out the hard way and had to reinstall the server (after trying to remove x11 - aka - the desktop)
Here are the commands I used to install CUDA:
{% highlight bash %}
$  wget https://developer.download.nvidia.com/compute/cuda/11.2.0/local_installers/cuda_11.2.0_460.27.04_linux.run
$ sudo sh cuda_11.2.0_460.27.04_linux.run
$ sudo apt-get autoremove
{% endhighlight %}
Note that apt-get autoremove will remove x11 and the desktop environment as well as some useful packages like the docs and such but oh well.

Lastly verify your install with:
{% highlight bash %}
$ nvidia-smi
{% endhighlight %}

![You will see something like this](/static/assets/2020-12-23-GPUs/nvidia-smi.png)

Once you have CUDA installed properly you can test it out properly with docker. I followed [this](https://powersj.io/post/ubuntu-server-nvidia-cuda/) tutorial to get started. Basically you just create a Dockerfile. Something like this:
{% highlight bash %}
$ mkdir docker
$ cd docker
$ nano Dockerfile
{% endhighlight %}

Then in the Dockerfile:
{% highlight dockerfile %}
FROM nvidia/cuda:11.1-base
CMD nvidia-smi
{% endhighlight %}

Then to build and run the file:
{% highlight bash %}
$ docker build -t nvidia-test .
$ sudo docker run --gpus all nvidia-test
{% endhighlight %}

If you have all this working I would download tensor flow from docker with:
{% highlight bash %}
$ docker pull nvcr.io/nvidia/tensorflow:20.12-tf1-py3
$  docker run --gpus all -it --rm nvcr.io/nvidia/tensorflow:20.12-tf1-py3
{% endhighlight %}

Then once you start on your project you might want to use volumes as outlined [here](https://ngc.nvidia.com/catalog/containers/nvidia:tensorflow) Note that this build of the tensorflow in the docker container is old if you want to run the new version of tensorflow run **Pip install --quite --upgrade tf-nightly** then your tutorials will work.
