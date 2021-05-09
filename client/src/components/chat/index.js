//  <!DOCTYPE html>
// <html lang="en">
// <head>
// 	<meta charset="UTF-8">

// 	<title>chat</title>

// 	<meta name="viewport" content="width=device-width, initial-scale=1.0">
// <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
// <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
// 		<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600" rel="stylesheet">


// 		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css">
// 	<link rel="stylesheet" href="assets/style.css">
// 	 <link rel="stylesheet" href="assets/mobile.css">
// </head>
// <body> 
export const ChatScreen = ()=>{
	return <>

		<div className="container">

			<section className="chat-box">

				<div className="chat-head  chat-box-container">
					<h3 className="title">Sophia William</h3>

					<i className="fa fa-bars menu-icon emoticons" aria-hidden="true"> </i>
				</div>


				<ul className="allmsgs  chat-box-container">


					<li className="msg">
						<img className="img" src="assets/imgs/3.jpg"/>

						<pre className="msg-data">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus possimus obcaecati doloremque porro, dolores sapiente hic dolorum expedita incidunt sequi deserunt quam quo laboriosam error enim, eos aspernatur veniam id. </pre>
					</li>


					<li className="msg">
						<img className="img" src="assets/imgs/3.jpg"/>

						<pre className="msg-data">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum dicta reprehenderit facilis. Ex dolore ipsa, quo voluptatum non error. Impedit reiciendis iusto saepe excepturi minus nisi natus enim fuga autem.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim omnis quidem excepturi itaque id. Delectus magnam, accusamus consequuntur laboriosam labore consequatur nam eaque nulla quo est iure rerum quam aliquam!</pre>
					</li>


					<li className="msg">
						<img className="img" src="assets/imgs/3.jpg"/>

						<pre className="msg-data">odio ut voluptates, unde perspiciatis tenetur quaerat. Inventore, eum. </pre>
					</li>


					<li className="msg">
						<img className="img" src="assets/imgs/3.jpg"/>

						<pre className="msg-data">sit amet, consectetur adipisicing elit. Hic ipsam, dolor molestiae reiciendis quae perspiciatis, officia ut vel blanditiis id quibusdam quos! Velit odio aliquid porro culpa, deserunt architecto veniam.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab adipisci quia quaerat quo quibusdam voluptate magni cumque voluptatum nisi, necessitatibus, aliquid iusto reprehenderit voluptas placeat perferendis iure debitis eaque! Incidunt!Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum, quaerat, vero. Nostrum ab esse pariatur temporibus rem, doloremque, eum laboriosam quia eveniet veritatis voluptate inventore natus eius, at, minima perferendis!</pre>
					</li>

				</ul>

				<div className="chat-footer">
					<div>
						<i className="fa fa-paperclip fa-lg emoticons"
							 aria-hidden="true"> </i>

						<textarea onKeyDown="handleEnter(event)" className="msg-box"
											placeholder="type a message"> </textarea>

						<i className="fa fa-smile-o fa-lg emoticons" aria-hidden="true"> </i>
					</div>
				</div>


			</section>


			<aside className="scrollbar-style-1">

				<div className="search ">
					<i className="fa fa-search" aria-hidden="true"> </i>
					<input type="text" placeholder="search"/>
				</div>

				<div className="online-users">
					<div className="user active-user active-conversation">
						<img className="img" src="assets/imgs/3.jpg"/>

							<div className="content">

								<div className="name-date-block">
									<p className="name">Sophia William</p>
									<span className="date">2:49 pm</span>
								</div>

								<p className="msg-excerpt">sit amet, consectetur adipisicing</p>
							</div>
					</div>

					<div className="user ">
						<img className="img" src="assets/imgs/2.jpg"/>

							<div className="content">

								<div className="name-date-block">
									<p className="name">Demi Lovato</p>
									<span className="date">3:20 pm</span>
								</div>

								<p className="msg-excerpt">Lorem ipsum dolor sit excepturw</p>
							</div>
					</div>

					<div className="user ">
						<img className="img" src="assets/imgs/5.jpg"/>

							<div className="content">

								<div className="name-date-block">
									<p className="name  active-user">Noah James</p>
									<span className="date">5:01 pm</span>
								</div>

								<p className="msg-excerpt">Omnis quae soluta dignissimos</p>
							</div>
					</div>

					<div className="user ">
						<img className="img" src="assets/imgs/6.png"/>

							<div className="content">

								<div className="name-date-block">
									<p className="name">Drake Johnson</p>
									<span className="date">5:01 pm</span>
								</div>

								<p className="msg-excerpt">aspernatur ipsam pariatur saepe</p>
							</div>
					</div>

					<div className="user ">
						<img className="img" src="assets/imgs/7.jpg"/>

							<div className="content">

								<div className="name-date-block">
									<p className="name">Abigail Woodley</p>
									<span className="date">5:01 pm</span>
								</div>

								<p className="msg-excerpt">officia ab veniam voluptatem
									disti</p>
							</div>
					</div>

					<div className="user ">
						<img className="img" src="assets/imgs/8	.jpg"/>

							<div className="content">

								<div className="name-date-block">
									<p className="name">Ethan Jackson</p>
									<span className="date">5:01 pm</span>
								</div>

								<p className="msg-excerpt">tempor ibus quidem reprehend</p>
							</div>
					</div>

					<div className="user ">
						<img className="img" src="assets/imgs/4.jpg"/>

							<div className="content">

								<div className="name-date-block">
									<p className="name">Zoey Tyler</p>
									<span className="date">5:01 pm</span>
								</div>

								<p className="msg-excerpt"> optio est iste eveniet quam
									repel</p>
							</div>
					</div>

				</div>
			</aside>

		</div>


	</>
}

