# SummerPracticeBE
1. Startup

	![image-20210804213301747](C:\Users\Working\AppData\Roaming\Typora\typora-user-images\image-20210804213301747.png)
	
2. 

3. 

4. 

5. ## Lessons Learned

  1. Git commituri cat mai dese, altfel este greu de gasit modificarea cu belea ( commit dedicat pt introducere clasa. metoda, rezovare bug)

- ### Linkuri  utile

| ***Adresa link***                                            | ***Descriere:***                                          |
| :----------------------------------------------------------- | --------------------------------------------------------- |
| https://spec.openapis.org/oas/v3.0.3 & https://quarkus.io/guides/openapi-swaggerui | Specificatie api si exemplu configurare custom pt swagger |
|                                                              |                                                           |
|                                                              |                                                           |




Bug List:

1. javax.servlet.ServletException: Circular view path [error]: would dispatch back to the current handler URL [/error] again.......................................
	
	- Root Cause: 
	
	- Solution: https://www.programmersought.com/article/74986387414/ (Use ResponseEntiity or annotation @ResponsBody
	- Details:  The general meaning is that the view result is not specified. Let you check your view configuration. In springmvc, we use viewResolver, and decide to jump by using the return prefix in the controller. Go to the corresponding view. This is also possible in Spring Boot, but now what I want to return is a piece of Json data, which does not need a view to receive.
	
	------
	
2. javaDate parse format from json problem.

3. Github: master vs main branch push problem 

	- Root Cause: Stupid political stuff!
	- Solution: Set MASTER as default.

4. Error: javax.validation.UnexpectedTypeException: HV000030: No validator could be found for constraint 'javax.validation.constraints.NotEmpty' validating type 'com.ibm.appbe.config.HardcodedLabels$ROLE'. Check configuration for 'role'

	- Root Cause: Valorile pt role nu sunt "persisted" in db (stubbed by ENUM)  => no validator available (TODO: de studiat validation types)
	- Soloution: Remove validation @NotEmpty(message = "User ROLE is mandatory") - [COMMIT REF: ]

5. Enrolment user la curs nu functioneaza corect (creaza user duplicati, sau nu populeaza tabelul de join)

