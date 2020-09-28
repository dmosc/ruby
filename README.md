*README copied from [devpost submission](https://devpost.com/software/ruby-lo2p7g) for RamHacks 2020*

## Precise Fit

### A personal visual evaluator that takes care of your posture during training sessions.

The impact of COVID-19 in our lives has been massive during this last year. It has affected all aspects of our lives (socially, economically, physically, and mentally).

We are very fortunate to be able to study and progress in our careers, regardless of the circumstance. Nonetheless, we do feel a passionate obligation towards reaching out to the most affected groups by the pandemic and generate a positive impact through technology.

One of the most affected communities during this pandemic is the older adults, as they suffered a hard impact on their lifestyles by being a vulnerable group. We have built this application with them in mind as we designed our engine with a simple, yet powerful, _User Interface_ to make sure seniors exercise with correct posture quickly and easily without having to worry about fancy technology.

Here's where **Precise Fit** comes in. Exercise is a fundamental activity to maintain a healthy lifestyle. Due to COVID-19, going to the gym or with a personal trainer has become a potential health risk, forcing individuals to be more sedentary. The **Precise Fit** engine helps people engage in physical activity through YouTube training sessions and constant correction of their posture. Just as if they were training with a personal trainer.

We invite you to check out our demonstration video to have a deep dive into what we did this last 24 hours. In the video, we cover in more detail the aforementioned situation we aim to tackle, the Machine Learning algorithm we used to solve the problem, the technical stack, and some of the challenges we faced.

[Link to presentation](https://docs.google.com/presentation/d/14d2Pz5hhM-piGCHXnJwS7jK4ihIfHvM-Cmq6XfenMaE/edit?usp=sharing)


[Try it out](frontend-5snxalmwva-uc.a.run.app)

**Note for trying it out**

Every time you click on a video to initialize a training session, the YouTube video gets downloaded as **mp4** over the server. We didn't manage to serve it as a buffer stream to start showing the chunks that get downloaded, instead, the entire data stream gets downloaded once, and then you can start watching the video.

We point this out because if you select a 60-minute video, the 150MB of the download will take a while, so we'd appreciate it if you guys could hold on there. On the other hand, if you guys pick a 10-minute video, it shouldn't take any longer than 5-10 seconds, so maybe that's easier and simpler to evaluate. Nonetheless, feel free to ping us out if you have any questions regarding the implementation of any specific details of interest :)

Thank you so much for the time invested on reviewing our project! We sure appreciate it!
