from nltk.tokenize import word_tokenize
from nltk import pos_tag
from nltk.stem import PorterStemmer

ps = PorterStemmer()


skill_keywords1 = ['vcs','figma','photoshop','nosql','python','json','xml', 'sql', 'cassandra', 'aws', 'sas', 'java', 'nosql', 'docker', 
 'c', 'c++', 'pandas','linux','cloud', 'gcp', 'mongodb', 'mysql', 'oracle', 'cicd','devops',
 'javascript', 'unix', 'react','reactjs','s3', 'ec2', 'lambda','kubernetes', 'django', 'github', 'es6','typescript','express','expressjs','camunda',
 'git', 'elasticsearch', 'splunk', 'airflow', 'jquery', 'nodejs','node.js', 'd3', 'c3', 'angular', 'node', 'postgressql', 'postgresql', 'postgres', 
 'css','html','html5','css3','scss','sass','http','angularjs','npm','keycloak','jwt','auth0','bootstrap','jenkins','helm','k8s','django','nginx','rest'
 ]


# another set of keywords that are longer than one word.
skill_keywords2 = set(['amazon web services', 'google cloud', 'sql server','helm charts','version control',
'web developer','unit test','unit testing','full stack', 'dev ops'])




skill_keywords1_set = set([ps.stem(tok) for tok in skill_keywords1]) # stem the keywords (since the job description is also stemmed.)
skill_keywords1_dict = {ps.stem(tok):tok for tok in skill_keywords1} # use this dictionary to revert the stemmed words back to the original.


def findKeywords(inputText):
    skill_list = []
    inputText = inputText.lower()
    tokens = word_tokenize(inputText)

    token_tag = pos_tag(tokens)

    include_tags = ['VBN', 'VBD', 'JJ', 'JJS', 'JJR', 'CD', 'NN', 'NNS', 'NNP', 'NNPS']

    filtered_tokens = [tok for tok, tag in token_tag if tag in include_tags]

    stemmed_tokens = [ps.stem(tok).lower() for tok in filtered_tokens]

    skill_words = skill_keywords1_set.intersection(stemmed_tokens)

    j = 0
    for skill_keyword2 in skill_keywords2:
        # skill keywords.
        if skill_keyword2 in inputText:
            skill_list.append(skill_keyword2)
            j += 1

    if len(skill_words) == 0 and j == 0:
        skill_list.append('nothing specified')

    skill_list += list(skill_words)
    return set(skill_list)