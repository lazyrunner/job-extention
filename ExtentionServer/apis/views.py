from rest_framework.parsers import JSONParser
from .serializers import InputText
from rest_framework.views import APIView
from rest_framework.response import Response
from .utils import findKeywords

class KeywordView(APIView):
    def get(self, request):
        input_text = {'text':'\n\n\n        \n          Job Description\n\n Full Stack Web Developer \n\nFront-End\n Web fundamentals like HTML5, JavaScript, and CSS, JSP, Servlets JavaScript frameworks like AngularJS, Oracle JET Libraries like jQuery, Knockout, AJAX, Websockets, Web Workers Apache HTTP Server, NGINX\nBack-End\n API design and development. JSON,XML,YAML CRUD (Create, Read, Update, Delete). RESTful Services : Jersey 2.0 Web Containers: Jetty, Tomcat, Weblogic, Websphere. Database technologies: OracleDB (compulsory), MySql, Mongodb JavaScript runtimes: Node.js, Nashorn.\nEnvironment\n IDE: Eclipse, NetBeans, SQL Developer Version control and build tools (Maven, Jenkins, Ant, Gradle, Git, Subversion)\nExposure to Machine learning & AI projects\n\nAnalyze, design develop, troubleshoot and debug software programs for commercial or end user applications. Writes code, completes programming and performs testing and debugging of applications.\n\nAs a member of the software engineering division, you will perform high-level design based on provided external specifications. Specify, design and implement minor changes to existing software architecture. Build highly complex enhancements and resolve complex bugs. Build and execute unit tests and unit plans. Review integration and regression test plans created by QA. Communicate with QA and porting engineering as necessary to discuss minor changes to product functionality and to ensure quality and consistency across specific products.\n\nDuties and tasks are varied and complex needing independent judgment. Fully competent in own area of expertise. May have project lead role and or supervise lower level personnel. BS or MS degree or equivalent experience relevant to functional area. 4 years of software engineering or related experience.\n\nAbout Us\n\nInnovation starts with inclusion at Oracle. We are committed to creating a workplace where all kinds of people can be themselves and do their best work. It’s when everyone’s voice is heard and valued, that we are inspired to go beyond what’s been done before. That’s why we need people with diverse backgrounds, beliefs, and abilities to help us create the future, and are proud to be an affirmative-action equal opportunity employer.\n\nOracle is an Equal Employment Opportunity Employer. All qualified applicants will receive consideration for employment without regard to race, color, religion, sex, national origin, sexual orientation, gender identity, disability and protected veterans status, age, or any other characteristic protected by law. Oracle will consider for employment qualified applicants with arrest and conviction records pursuant to applicable law.\n        \n      ','site':'linked.com'}
        serializer = InputText(input_text).data
        words = findKeywords(input_text['text'])
        return Response(words)     
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = InputText(data=data)
        if serializer.is_valid():
            words = findKeywords(data['text'])
            return Response(words)  
        return Response(serializer.errors, status=400)        


#source https://www.justintodata.com/use-nlp-in-python-practical-step-by-step-example/