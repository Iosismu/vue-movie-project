// import { mount } from '@vue/test-utils'
// import Example from './Example.vue'

// test('메시지를 변경합니다', async () => { // mount에서 반환하는 wrapper객체를 이용해서 vue컴포넌트 테스트 가능
//   const wrapper = mount(Example)
//   // wrapper.vm === this
//   expect(wrapper.vm.msg).toBe('Hello World!')
//   // wrapper.vm.msg = 'Hello HEROPY!'
//   await wrapper.setData({
//     msg: 'Hello HEROPY!'
//   })
//   expect(wrapper.vm.msg).toBe('Hello HEROPY!')
//   expect(wrapper.find('div').text()).toBe('Hello HEROPY!')
// })




// import { resolveComponent } from '@vue/runtime-core'
// import axios from 'axios'
// import { fetchMovieTitle } from './example'

// describe('비동기 테스트', () => {
//   test('영화 제목 변환', async () => {
//     axios.get = jest.fn(() => { // 실제 OMDbAPI에서 영화 정보를 가져올 필요는없다
//       return  new Promise(resolve => { // 그래서 모의함수를 만들어서 data > Title비슷하게 값을 준다.
//         resolve({                     // 근데 axios는 비동기로 처리해야되나까 promise로 
//           data: {
//             Title: 'Frozen II'
//           }
//         })
//       })
//     })          // network없이 실행해도 코드가 동작한다 왜냐하면 axios.get에 모의 함수를 만들었기 떄문에
//     const title = await fetchMovieTitle() // axios.get에 모의 함수를 만드는 이유는 외부요인들을 제거 하기위해서
//     expect(title).toBe('Frozen ii')
//   })
// })


// import * as example from './example'

// describe('비동기 테스트', () => {
//   test('async/await', async () => { // 이 패턴이 비동기처리로는 가장 마음에든다. but 다른 비동기패턴도 사용할떄가 있음
//     jest.spyOn(example, 'asyncFn') // 모의 함수 == 가짜/모의로 만드는 함수
//       .mockResolvedValue('Done!!') // 모의 뜻 == Mock, 실제함수를 가짜함수로 만들어서 반환하는것을 Moking이라고한다. 
//     const res = await example.asyncFn()
//     expect(res).toBe('Done!!')
//   }, 7000) // test함수는 5초까지 기다릴 수 있도록 설정 되있으니 이걸 설정으로 변경가능
// })