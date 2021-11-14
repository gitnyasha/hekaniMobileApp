import React, {useState} from 'react'
import { Alert,Picker, Text } from 'react-native'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormButton from './FormButton'
import server from '../../api/server'
import { useNavigation } from '@react-navigation/native'
import categoriesApi from '../../api/categoriesApi'
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker'

const QuestionForm = () => {
    const navigation = useNavigation();

    const [ question, setQuestion ] = useState({
        title: '',
        question_category_id: 1,
    })
    const [selectedValue, setSelectedValue] = useState("1");

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCategories = async () => {

        try {
            const myCategories = await categoriesApi.getCategories();
            setCategories(myCategories);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
    
    useEffect(() => {  
        fetchCategories();
    }, []);

    if (isLoading) {
        return (
          <View>
            <ActivityIndicator visible={true}/>
          </View>
        );
      }

    const { title } = question;
    const submitForm = async () => {
        const response = await server.post(
            `/questions`,
            {
                title: title,
                question_category_id: question_category_id,
            },
            { 
                withCredentials: true 
            },
            {
                headers: { 
                    'Access-Control-Allow-Origin': 'https://hekani-social-media.herokuapp.com/api/v1' 
                },
            }
        ).then(response => {

            if (response.data.status === 'success') {
                Alert.alert(response.data.status);
                navigation.navigate('Questions');
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const handleOnChangeText = (value, fieldName) => {
        setQuestion({...question, [fieldName]: value });
    };

    return (
        <FormContainer>
            <FormInput value={title} onChangeText={value => handleOnChangeText(value, 'title')} label="Ask" placeholder="Question..." />
            <View style={styles.container}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={value => handleOnChangeText(value, 'question_category_id')} label="Category"
                >
                    {categories.map((item) => <PickerItem label={item.name} value={item.id} />)}
                </Picker>
            </View>
            <FormButton label="Submit" onPress={submitForm} />
        </FormContainer>
    )
}

export default QuestionForm
